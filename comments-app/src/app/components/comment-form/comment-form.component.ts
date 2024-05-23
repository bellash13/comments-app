import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  isOnline: boolean = true;
  topics: string[] = ['Leapa', 'Cybersource', 'NexGo', 'Bancobu'];
  selectedTopic: string = '';
  comments: Comment[] = [];

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      id:['',[]],
      comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      topic: ['', Validators.required], 
      author: ['John Doe',[]],
      date: [new Date(),[]]
    });
  }

  ngOnInit() {
    this.commentService.getOnlineStatus().subscribe(status => {
      this.isOnline = status;
    });

    this.commentForm.get('topic')?.valueChanges.subscribe(topic => {
      this.selectedTopic = topic;
      this.loadComments(topic);
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const { comment, topic } = this.commentForm.value;
      this.commentService.saveComment({ comment, topic });
      this.commentForm.reset();
      this.commentForm.get('topic')?.setValue(topic); 
      this.loadComments(topic);
    }
  }

  loadComments(topic: string) {
    console.log(`Loading comments for ${topic}`);
    this.commentService.getCommentsByTopic(topic).subscribe((comments)=>{
      this.comments = comments;
    });
  }

  get comment() {
    return this.commentForm.get('comment');
  }

  get topic() {
    return this.commentForm.get('topic');
  }
}
