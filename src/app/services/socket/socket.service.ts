import { PostView, CommentView } from './../../models/views.models';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // GENERAL_SOCKET:string = 'WSS://gama-posts-comments.herokuapp.com/retrieve/mainSpace'
  // SPECIFIC_SOCKET:string = "WSS://gama-posts-comments.herokuapp.com/retrieve/";

  GENERAL_SOCKET:string = 'ws://localhost:8082/retrieve/mainSpace'
  SPECIFIC_SOCKET:string = "ws://localhost:8082/retrieve/";

  constructor() { }
  connetToGeneralSpace():WebSocketSubject<PostView>{
    return webSocket(this.GENERAL_SOCKET);
  }
  connetToSpecificSpace(post:string):WebSocketSubject<CommentView>{
    return webSocket(`${this.SPECIFIC_SOCKET}${post}`);
  }

}
