import { PostDetailComponent } from './post-detail/post-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostFormComponent } from './post-form/post-form.component';
import { PostsPageComponent } from './posts-page/posts-page.component';


const routes: Routes = [
  { path: 'post-form', component: PostFormComponent },
  { path: 'posts', component: PostsPageComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
