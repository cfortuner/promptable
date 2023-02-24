import { PromptVariables, PromptTemplate } from "@promptable/promptable";

declare const template: PromptTemplate<
  `Here are some examples of Wolfram Alpha functions, operators, and keywords, along with examples of how to use them in queries:

Functions:

sqrt(x): finds the square root of x
Example: sqrt(2)

sin(x), cos(x), tan(x): finds the sine, cosine, or tangent of x (in radians)
Example: sin(30 degrees)

integrate(f(x), x): finds the indefinite integral of f(x) with respect to x
Example: integrate(x^2 + 2x + 1, x)

derivative(f(x), x): finds the derivative of f(x) with respect to x
Example: derivative(x^2 + 2x + 1, x)

limit(f(x), x -> a): finds the limit of f(x) as x approaches a
Example: limit(1/x, x -> 0)

sum(f(i), i = a to b): finds the sum of f(i) for i from a to b
Example: sum(i^2, i = 1 to 5)

product(f(i), i = a to b): finds the product of f(i) for i from a to b
Example: product(2^i, i = 1 to 4)

Operators:

+, -, *, /: perform addition, subtraction, multiplication, or division
Example: 3 + 4, 6 * 7, 10 / 2, 8 - 5

^: raises a number to a power
Example: 2^3

!: finds the factorial of a number
Example: 5!

%: finds the remainder of a division
Example: 10 % 3

Keywords:

plot: creates a plot of a function or data
Example: plot(x^2, x = -5 to 5)

solve: solves an equation or system of equations
Example: solve(x^2 + 2x + 1 = 0)

table: generates a table of values for a function or expression
Example: table(i^2, i = 1 to 5)

convert: converts units or quantities between different systems
Example: convert(100 miles per hour to meters per second)

weather: provides weather information for a location
Example: weather in New York City

Note that these are just a few examples of the functions, operators, and keywords that Wolfram Alpha supports. The system is designed to be flexible and support a wide range of mathematical, scientific, and general knowledge queries.

Using your FULL knowledge of Wolfram alpha syntax, language, operators, keywords and functions. Write out proofs that solve the following problems:

Q: John is 5 years old today, next year his sister will be twice John's age, how is old is John's sister now? 

A: John's sister is now 10 years old.
Proof: Let x be John's sister's age now. Then, John's age now is 5 and his sister's age next year is twice his age, or 2*5=10. Thus, x = 10.
Valid WA Query:
solve(x = 2*5, x)

Q: The sum of two numbers is 15 and the difference of the same two numbers is 5. Find the two numbers.

A: The two numbers are 10 and 5.
Proof: Let x and y be the two numbers. Then, x + y = 15 and x - y = 5. Adding the two equations together gives x + x = 20, so x = 10. Substituting x = 10 into either of the original equations gives y = 5. Thus, x = 10 and y = 5.
Valid WA Query:
solve(x + y = 15, x - y = 5)

Q: Find the area of a triangle with sides of length 5, 6, and 7.

A: The area of the triangle is 14.7.
Proof: Using Heron's formula, the area of a triangle with sides of length a, b, and c is given by A = sqrt(s(s-a)(s-b)(s-c)), where s = (a + b + c)/2. In this case, a = 5, b = 6, and c = 7, so s = (5 + 6 + 7)/2 = 18/2 = 9. Substituting these values into Heron's formula gives A = sqrt(9(9-5)(9-6)(9-7)) = sqrt(9*4*3*2) = sqrt(288) = 14.7.
Valid WA Query:
area of triangle(5, 6, 7)

Q:Find the derivative of f(x) = x^3 + 2x + 1.

A: The derivative of f(x) is 3x^2 + 2.
Proof: Using the power rule, the derivative of f(x) = x^3 + 2x + 1 is given by f'(x) = 3x^2 + 2.
Valid WA Query:
derivative(x^3 + 2x + 1, x)`,
  PromptVariables<`{{test}} Here are some examples of Wolfram Alpha functions, operators, and keywords, along with examples of how to use them in queries:

Functions:

sqrt(x): finds the square root of x
Example: sqrt(2)

sin(x), cos(x), tan(x): finds the sine, cosine, or tangent of x (in radians)
Example: sin(30 degrees)

integrate(f(x), x): finds the indefinite integral of f(x) with respect to x
Example: integrate(x^2 + 2x + 1, x)

derivative(f(x), x): finds the derivative of f(x) with respect to x
Example: derivative(x^2 + 2x + 1, x)

limit(f(x), x -> a): finds the limit of f(x) as x approaches a
Example: limit(1/x, x -> 0)

sum(f(i), i = a to b): finds the sum of f(i) for i from a to b
Example: sum(i^2, i = 1 to 5)

product(f(i), i = a to b): finds the product of f(i) for i from a to b
Example: product(2^i, i = 1 to 4)

Operators:

+, -, *, /: perform addition, subtraction, multiplication, or division
Example: 3 + 4, 6 * 7, 10 / 2, 8 - 5

^: raises a number to a power
Example: 2^3

!: finds the factorial of a number
Example: 5!

%: finds the remainder of a division
Example: 10 % 3

Keywords:

plot: creates a plot of a function or data
Example: plot(x^2, x = -5 to 5)

solve: solves an equation or system of equations
Example: solve(x^2 + 2x + 1 = 0)

table: generates a table of values for a function or expression
Example: table(i^2, i = 1 to 5)

convert: converts units or quantities between different systems
Example: convert(100 miles per hour to meters per second)

weather: provides weather information for a location
Example: weather in New York City

Note that these are just a few examples of the functions, operators, and keywords that Wolfram Alpha supports. The system is designed to be flexible and support a wide range of mathematical, scientific, and general knowledge queries.

Using your FULL knowledge of Wolfram alpha syntax, language, operators, keywords and functions. Write out proofs that solve the following problems:

Q: John is 5 years old today, next year his sister will be twice John's age, how is old is John's sister now? 

A: John's sister is now 10 years old.
Proof: Let x be John's sister's age now. Then, John's age now is 5 and his sister's age next year is twice his age, or 2*5=10. Thus, x = 10.
Valid WA Query:
solve(x = 2*5, x)

Q: The sum of two numbers is 15 and the difference of the same two numbers is 5. Find the two numbers.

A: The two numbers are 10 and 5.
Proof: Let x and y be the two numbers. Then, x + y = 15 and x - y = 5. Adding the two equations together gives x + x = 20, so x = 10. Substituting x = 10 into either of the original equations gives y = 5. Thus, x = 10 and y = 5.
Valid WA Query:
solve(x + y = 15, x - y = 5)

Q: Find the area of a triangle with sides of length 5, 6, and 7.

A: The area of the triangle is 14.7.
Proof: Using Heron's formula, the area of a triangle with sides of length a, b, and c is given by A = sqrt(s(s-a)(s-b)(s-c)), where s = (a + b + c)/2. In this case, a = 5, b = 6, and c = 7, so s = (5 + 6 + 7)/2 = 18/2 = 9. Substituting these values into Heron's formula gives A = sqrt(9(9-5)(9-6)(9-7)) = sqrt(9*4*3*2) = sqrt(288) = 14.7.
Valid WA Query:
area of triangle(5, 6, 7)

Q:Find the derivative of f(x) = x^3 + 2x + 1.

A: The derivative of f(x) is 3x^2 + 2.
Proof: Using the power rule, the derivative of f(x) = x^3 + 2x + 1 is given by f'(x) = 3x^2 + 2.
Valid WA Query:
derivative(x^3 + 2x + 1, x)`>
>;

export default template;
