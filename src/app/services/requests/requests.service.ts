import { CreatePostCommand } from './../../models/command.models';
import { PostView } from './../../models/views.models';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  GET_ALL_POSTS_URL = 'http://localhost:8081/bring/all/posts'
  GET_POST_BY_ID_URL = 'http://localhost:8081/bring/all/posts'
  POST_POST_URL = 'http://localhost:8080/create/post'
  POST_COMMENT_URL = 'http://localhost:8080/add/comment'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<PostView[]>(this.GET_ALL_POSTS_URL).pipe(
      catchError(this.handleError<PostView[]>('getPosts', []))
    );
  }

  createPost(command:CreatePostCommand){
    return this.http.post<any>(this.POST_POST_URL, command, this.httpOptions).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
