import { StateService } from './../services/state/state.service';
import { AddCommentCommand } from './../models/command.models';
import { Observable } from 'rxjs';
import { SocketService } from './../services/socket/socket.service';
import { PostView, CommentView } from './../models/views.models';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RequestsService } from '../services/requests/requests.service'; 
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post?:PostView;
  socket?:WebSocketSubject<CommentView>;
  newAuthor:string= ''
  newContent:string=''

  constructor(
    private route: ActivatedRoute,
    private request:RequestsService,
    private location: Location,
    private socketService:SocketService,
    private state:StateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.validateLogin()){
      this.getPost()
    }  
    
  }

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState => {
      if(!currentState.logedIn){
        this.router.navigateByUrl('/login')
        validationResult = false
        return
      }
      validationResult =  true
    })
    return validationResult;
  }

  getPost(){
    const id:string|null= this.route.snapshot.paramMap.get('id')
    this.request.getPostsById(id).subscribe(
      foundPost => {
        this.post = foundPost
        console.log(this.post);
        this.connectToChannel(this.post?this.post.aggregateId:'mainSpace')
      }
    )
  }

  connectToChannel(path:string){
    this.socket = this.socketService.connetToSpecificSpace(path)
    this.socket.subscribe( message => this.addComment(message))
  }
  createComment(){
    const command:AddCommentCommand = {
      commentId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      postId: this.post?.aggregateId?this.post?.aggregateId:'',
      author: this.newAuthor,
      content:  this.newContent
    }

    this.request.createComment(command).subscribe()
    this.newAuthor = ''
    this.newContent = ''
  }

  addComment(newComment:CommentView){
    this.post?.comments.unshift(newComment)
  }

  goBack(): void {
    this.location.back();
    this.socket?.complete()
  }

}
