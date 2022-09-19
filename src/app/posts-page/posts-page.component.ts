import { Router } from '@angular/router';
import { StateService } from './../services/state/state.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../services/socket/socket.service';
import { CreatePostCommand } from './../models/command.models';
import { PostView } from './../models/views.models';
import { RequestsService } from './../services/requests/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {
  
  socketManager?:WebSocketSubject<PostView>;
  
  posts:PostView[]=[]
  newTitle:string='';
  newAuthor:string='';

  availableState:any;

  constructor(private requests:RequestsService, 
    private socket:SocketService, private state:StateService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this.validateLogin()){
      this.getPosts()
      this.connectToMainSpace()
    }   
  }

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState => {
      this.availableState = currentState;
      if(!currentState.logedIn){
        this.router.navigateByUrl('/login')
        validationResult = false
        return
      }
      validationResult =  true
    })
    return validationResult;
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
    this.submitPost(newPost, this.availableState.token);
  }

  submitPost(command:CreatePostCommand, token:string){
    this.requests.createPost(command, token)
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

  closeSocketConnection(){
    this.socketManager?.complete()
  }
}
