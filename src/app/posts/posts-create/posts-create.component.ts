import { Component } from '@angular/core';
import { Post } from '../post';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrl: './posts-create.component.css'
})
export class PostsCreateComponent {
  enteredContent = '';
  enteredTitle = '';

  constructor(public postsService: PostsService) { }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    const post: Post = {
      id: '',
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(post);
    form.resetForm();
   };
}
