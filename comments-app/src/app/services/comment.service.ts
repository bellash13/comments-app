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
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine); // Observable for online status
  private apiUrl = 'http://127.0.0.1:8000/api/comments'; // URL of the server API
  private syncUrl = 'http://127.0.0.1:8000/api/sync';

  constructor(private http: HttpClient) {
    // Event listeners for online/offline status changes
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    const onlineStatus = navigator.onLine;
    this.isOnline.next(onlineStatus);

    if (onlineStatus) {
      this.syncComments();
    }
  }

  // Save a comment (either online or offline)
  saveComment(comment: Partial<Comment>) {
    const newComment: Comment = {
      ...comment,
      author: 'John Doe',  // sample author
      date: new Date()
    } as Comment;

    if (navigator.onLine) {
      this.http.post<Comment>(this.apiUrl, newComment).subscribe({
        next: (res) => {
          console.log('Comment saved to server:', res);
        },
        error: (err) => console.error('Error saving comment:', err)
      });
    } else {
      this.storeCommentOffline(newComment);
    }
  }

  private storeCommentOffline(comment: Comment) {
    const comments = JSON.parse(localStorage.getItem(this.commentsKey) || '[]');
    comments.push(comment);
    localStorage.setItem(this.commentsKey, JSON.stringify(comments));
  }

  private syncComments() {
    const offlineComments = JSON.parse(localStorage.getItem(this.commentsKey) || '[]');
    if (offlineComments.length > 0) {
      this.http.post<Comment[]>(this.syncUrl, offlineComments).subscribe({
        next: (res) => {
          console.log('Comments synced to the server:', res);
          localStorage.removeItem(this.commentsKey);
        },
        error: (err) => console.error('Error syncing comments:', err)
      });
    }
  }

  // Get comments filtered by topic
  getCommentsByTopic(topic: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?topic=${topic}`).pipe(
      map(comments => comments.filter(comment => comment.topic === topic))
    );
  }

  // Get the online status observable
  getOnlineStatus(): Observable<boolean> {
    return this.isOnline.asObservable();
  }
}
