import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsKey = 'comments';
  private comments: Comment[] = [];
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  private apiUrl = 'api/comments'; // URL of the server API

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.syncComments());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    this.isOnline.next(navigator.onLine);
  }

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

  private storeCommentsOffline() {
    localStorage.setItem(this.commentsKey, JSON.stringify(this.comments));
  }

  private syncComments() {
    const offlineComments = JSON.parse(localStorage.getItem(this.commentsKey) || '[]');
    if (offlineComments.length > 0) {
      this.http.post<Comment[]>(this.apiUrl, offlineComments).subscribe({
        next: (res) => {
          console.log('Commentaires synchronisés avec le serveur :', res);
          localStorage.removeItem(this.commentsKey);
          this.comments = [];
        },
        error: (err) => console.error('Erreur lors de la synchronisation des commentaires :', err)
      });
    }
  }

  getCommentsByTopic(topic: string): Comment[] {
    return this.comments.filter(comment => comment.topic === topic);
  }

  getOnlineStatus() {
    return this.isOnline.asObservable();
  }
}
