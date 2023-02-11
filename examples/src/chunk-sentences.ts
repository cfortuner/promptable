import chalk from "chalk";
import { CharacterTextSplitter, SentenceTextSplitter } from "promptable";

/**
 * Simple example showing how to chunk sentences
 *
 * outputs the following:
 *
 * [
 *     "Fatima Whitbread (born 1961) is a retired British javelin thrower. She broke the women's javelin throw world record with a throw of 77.44 metres (254 ft 3⁄4 in) at the 1986 European Athletics Championships in Stuttgart, and also won the European title that year.",
 *     "She took the gold medal at the 1987 World Championships in Athletics and is a two-time Olympic medallist, winning bronze at the 1984 games and silver at the 1988 games. She was voted BBC Sports Personality of the Year in 1987. During her career, she had a well-publicised rivalry with another British javelin athlete, Tessa Sanderson.",
 *     "Her later career was affected by a persistent shoulder injury, and in 1992 she retired from competition. She has since appeared on several television programmes, including I'm a Celebrity ... Get Me Out of Here! in 2011. Whitbread was named the Sports Writers' Association Sportswoman of the Year in 1986 and 1987.",
 *     "She was appointed a Member of the Order of the British Empire for services to athletics."
 * ]
 */
export default async function run(args: string[]) {
  const splitter = new SentenceTextSplitter();
  const text = `
  Fatima Whitbread (born 1961) is a retired British javelin thrower. 
  She broke the women's javelin throw world record with a throw of 77.44 metres (254 ft 3⁄4 in) at the 1986 European Athletics Championships in Stuttgart, and also won the European title that year.
  She took the gold medal at the 1987 World Championships in Athletics and is a two-time Olympic medallist, winning bronze at the 1984 games and silver at the 1988 games.
  She was voted BBC Sports Personality of the Year in 1987.
  During her career, she had a well-publicised rivalry with another British javelin athlete, Tessa Sanderson.
  Her later career was affected by a persistent shoulder injury, and in 1992 she retired from competition.
  She has since appeared on several television programmes, including I'm a Celebrity ... Get Me Out of Here! in 2011.
  Whitbread was named the Sports Writers' Association Sportswoman of the Year in 1986 and 1987.
  She was appointed a Member of the Order of the British Empire for services to athletics.`;

  const chunks = splitter.splitText(text, {
    chunk: true,
    chunkSize: 50, // 50 tokens
    overlap: 0,
  });
  console.log(chalk.white(`Chunks:`));
  console.log(chalk.green(JSON.stringify(chunks, undefined, 4)));
}
