import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsPageComponent } from './posts-page/posts-page.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  { path: 'posts', component: PostsPageComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
