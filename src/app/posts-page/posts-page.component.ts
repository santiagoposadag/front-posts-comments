import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../services/socket/socket.service';
import { CreatePostCommand } from './../models/command.models';
import { PostView, CommentView } from './../models/views.models';
import { RequestsService } from './../services/requests/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {
  
  socketManager?:WebSocketSubject<PostView>;
  socketManagerPreview?:WebSocketSubject<CommentView>;
  
  posts:PostView[]=[]
  newTitle:string='';
  newAuthor:string='';
  postPreview?:PostView;

  constructor(private requests:RequestsService, 
    private socket:SocketService
    ) { }

  ngOnInit(): void {
    this.getPosts()
    this.connectToMainSpace()
  }

  getPosts(){
    this.requests.getPosts().subscribe(
      payLoad =>{
        this.posts =payLoad
        
      } 
    );
  }

  createPost(){
    const newPost:CreatePostCommand = {
      postId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
    this.submitPost(newPost);
  }

  submitPost(command:CreatePostCommand){
    this.requests.createPost(command)
    .subscribe()
  }

  connectToMainSpace(){
    this.socketManager = this.socket.connetToGeneralSpace()
    this.socketManager.subscribe((message) => {
      this.addPost(message)
    })
  }

  addPost(post:PostView){
    this.newAuthor = ''
    this.newTitle = ''
    this.posts.unshift(post)
  }

  openPreview(post:PostView){
    if(this.socketManagerPreview !== null){
      this.socketManagerPreview?.complete()
    }
    this.requests.getPostsById(post.aggregateId)
    .subscribe(post => this.postPreview = post);
    this.socketManagerPreview = this.socket.connetToSpecificSpace(post.aggregateId)
    this.socketManagerPreview.subscribe(comment => {
      this.postPreview?.comments.push(comment)
    })
  }

  closeSocketConnection(){
    this.socketManager?.complete()
  }
}
