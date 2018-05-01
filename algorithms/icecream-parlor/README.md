# Icecream Parlor

https://www.hackerrank.com/challenges/icecream-parlor/problem

Sunny and Johnny like to pool their money and go to the ice cream parlor. Johnny never buys the same flavor that Sunny does. The only other rule they have is that they spend all of their money.

Given a list of prices for the flavors of ice cream, select the two that will cost all of the money they have.

Complete the function icecreamParlor below to return an array containing the indexes of the prices of the two flavors they buy. The returned array must be sorted ascending.

Input Format

The first line contains an integer, , denoting the number of trips to the ice cream parlor. The next sets of lines each describe a visit. Each trip is described as follows:

The integer , the amount of money they have pooled.
The integer , the number of flavors offered at the time.
space-separated integers denoting the cost of each flavor: .
Note: The index within the cost array represents the flavor of the ice cream purchased.

Constraints

, ∀
There will always be a unique solution.
Output Format

For each test case, print two space-separated integers denoting the indexes of the two flavors purchased, in ascending order.

Sample Input

2
4
5
1 4 5 3 2
4
4
2 2 4 3
Sample Output

1 4
1 2
Explanation

Sunny and Johnny make the following two trips to the parlor:

The first time, they pool together dollars. Of the five flavors available that day, flavors and have a total cost of .
The second time, they pool together dollars. TOf the four flavors available that day, flavors and have a total cost of .
