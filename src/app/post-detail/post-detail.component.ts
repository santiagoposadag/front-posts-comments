import { Observable } from 'rxjs';
import { SocketService } from './../services/socket/socket.service';
import { PostView, CommentView } from './../models/views.models';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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
    private socketService:SocketService
  ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(){
    const id:string|null= this.route.snapshot.paramMap.get('id')
    this.request.getPosts().subscribe(
      posts => {
        const foundPost = posts.find(post => post.aggregateId === id)
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

  addComment(newComment:CommentView){
    this.post?.comments.push(newComment)
  }

  goBack(): void {
    this.location.back();
    this.socket?.complete()
  }

}
