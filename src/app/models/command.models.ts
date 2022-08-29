export type CreatePostCommand = {
  postId:string,
  author:string,
  title:string
}

export type CddCommentCommand = {
  commentId:string,
  postId:string,
  author:string,
  content:string
}