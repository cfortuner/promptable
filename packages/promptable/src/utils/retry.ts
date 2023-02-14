import chalk from "chalk";
import { logger } from "src/internal/Logger";

const initialDelaySeconds = 1;
const maxDelaySecond = 10;

/**
 * backoff
 *
 * Returns a number of seconds to wait before retrying a failed request.
 *
 * Uses exponential backoff with jitter.
 *
 * Strategy taken from Stripe's blog post:
 * https://stripe.com/blog/idempotency
 *
 * @param retryCount
 * @returns
 */
export function backoff(retryCount: number): number {
  // exponential backoff with jitter
  let sleepSeconds = Math.min(
    initialDelaySeconds * 2 ** (retryCount - 1),
    maxDelaySecond
  );

  // Apply some jitter
  sleepSeconds *= 0.5 * (1 + Math.random());

  // Make sure we don't sleep less than the initial delay
  sleepSeconds = Math.max(initialDelaySeconds, sleepSeconds);

  return sleepSeconds;
}

/**
 *
 * This function takes a maxRetries parameter that specifies the maximum number of retries before giving up.
 * It returns a decorator function that takes the target object, property key, and property descriptor as parameters.
 *  The decorator function modifies the descriptor's value property to wrap the original function with retry logic.
 *
 * The wrapped function will retry the original function with exponential backoff until either the function
 * succeeds or the maximum number of retries is exceeded. If the function fails, it will wait for a certain
 * number of seconds determined by the backoff function before trying again.
 *
 * @param maxRetries
 * @returns Decorator function
 */
export function retry(maxRetries: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (retryCount === maxRetries) {
            logger.log(chalk.red(`Maximum retries exceeded`));
            throw error; // re-throw error if maximum retries exceeded
          } else {
            logger.log(chalk.yellow(`Retrying...`));
            const sleepSeconds = backoff(retryCount);
            await new Promise((resolve) =>
              setTimeout(resolve, sleepSeconds * 1000)
            );
          }
        }
      }
    };

    return descriptor;
  };
}
