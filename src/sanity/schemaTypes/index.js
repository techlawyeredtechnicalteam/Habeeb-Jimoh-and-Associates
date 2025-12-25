import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { commentType } from "./commentType";
import policy from "./policy";

export const schema = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    commentType,
    policy
  ]
};
