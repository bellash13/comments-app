import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsKey = 'comments'; // Key for storing comments in localStorage
  private comments: Comment[] = []; // In-memory comments array
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine); // Observable for online status
  private apiUrl = 'api/comments'; // URL of the server API
  private currentId = 61; // Starting ID for new comments

  constructor(private http: HttpClient) {
    // Load initial comments from the server
    this.loadInitialComments();
    
    // Event listeners for online/offline status changes
    window.addEventListener('online', () => this.syncComments());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    this.isOnline.next(navigator.onLine);
  }

  // Load initial comments from the server
  private loadInitialComments() {
    this.http.get<Comment[]>(this.apiUrl).subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => console.error('Error loading initial comments:', err)
    });
  }

  // Save a comment (either online or offline)
  saveComment(comment: Partial<Comment>) {
    const newComment: Comment = {
      id: this.currentId++, // Assign a new numeric ID
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

  private storeCommentsOffline() {
    localStorage.setItem(this.commentsKey, JSON.stringify(this.comments));
  }

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
  getCommentsByTopic(topic: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl).pipe(
      map(comments => comments.filter(comment => comment.topic === topic))
    );
  }

  // Get the online status observable
  getOnlineStatus() {
    return this.isOnline.asObservable();
  }
}
