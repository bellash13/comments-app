import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsKey = 'comments'; // Key for storing comments in localStorage
  private comments: Comment[] = []; // In-memory comments array
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine); // Observable for online status
  private apiUrl = 'api/comments'; // URL of the server API

  constructor(private http: HttpClient) {
    // Event listeners for online/offline status changes
    window.addEventListener('online', () => this.syncComments());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  // Update the online status observable
  private updateOnlineStatus() {
    this.isOnline.next(navigator.onLine);
  }

  // Save a comment (either online or offline)
  saveComment(comment: Partial<Comment>) {
    const newComment: Comment = {
      ...comment,
      author: 'John Doe',  // sample author
      date: new Date()
    } as Comment;
    this.comments.push(newComment);
    if (navigator.onLine) {
      this.syncComments();
    } else {
      this.storeCommentsOffline();
    }
  }

  // Store comments in localStorage when offline
  private storeCommentsOffline() {
    localStorage.setItem(this.commentsKey, JSON.stringify(this.comments));
  }

  // Sync comments to the server when back online
  private syncComments() {
    const offlineComments = JSON.parse(localStorage.getItem(this.commentsKey) || '[]');
    if (offlineComments.length > 0) {
      this.http.post<Comment[]>(this.apiUrl, offlineComments).subscribe({
        next: (res) => {
          console.log('Comments synced to the server:', res);
          localStorage.removeItem(this.commentsKey);
          this.comments = [];
        },
        error: (err) => console.error('Error syncing comments:', err)
      });
    }
  }

  // Get comments filtered by topic
  getCommentsByTopic(topic: string): Comment[] {
    return this.comments.filter(comment => comment.topic === topic);
  }

  // Get the online status observable
  getOnlineStatus() {
    return this.isOnline.asObservable();
  }
}
