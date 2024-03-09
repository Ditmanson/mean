import { Component,  } from '@angular/core';
import { Post } from './posts/post';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  storedPosts: Post[] = []; // Specify the type of the 'storedPosts' array as an array of 'any' type.

  onPostAdded(post: any) {
    this.storedPosts.push(post);
  }
}
