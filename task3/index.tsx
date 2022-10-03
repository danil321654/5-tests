import React, { FC } from "react";

export interface Book {
  id: string;
  name: string;
}

export const BooksList: FC<{ books: Book[] }> = ({ books }) => {
  return (
    <ul>
      {books.map((book, i) => (
        <li key={i}>{book.name}</li>
      ))}
    </ul>
  );
};
// 1) What’s wrong with this code snippet?
//    On the 10th line array index is used as react key

// 2) How can we improve it?
//    Instead of key={i} should be used key={book.id}, because it's unique and won't change across rerenders
//    Also we can remove i from parameters of map function as it becomes unused

// 3) Are there any cases when this code can be used with no modification?
//    We can use array indexes as keys only if array won't dynamically change and we don't have any unique stable ids for items
