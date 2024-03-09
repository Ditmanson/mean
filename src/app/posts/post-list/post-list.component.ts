import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy{
posts: Post [] = [];
private postsSub: Subscription;

constructor(public postsService: PostsService ) {
  this.postsSub = new Subscription();
}

ngOnInit(): void {
  this.postsSub = this.postsService.getPostUpdateListener()
  .subscribe((posts:Post[]) => {
    this.posts = posts;
  });
  this.postsService.getPosts();
}

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
