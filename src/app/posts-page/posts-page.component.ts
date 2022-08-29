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
  posts:PostView[]=[]

  newTitle:string='';
  newAuthor:string='';

  constructor(private requests:RequestsService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this.requests.getPosts().subscribe(
      payLoad =>{
        this.posts =payLoad
        console.log(this.posts);
        
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
    .subscribe(response => console.log(response)
    )
  }
}
