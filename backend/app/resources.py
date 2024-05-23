import falcon
from falcon.media.validators import jsonschema
from sqlalchemy.orm import scoped_session
from app.models import SessionLocal, Comment
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

comment_schema = {
    "type": "object",
    "properties": {
        "comment": {"type": "string", "minLength": 3, "maxLength": 255},
        "topic": {"type": "string"},
    },
    "required": ["comment", "topic"]
}

class CommentResource:
    def on_get(self, req, resp):
        session = SessionLocal()
        try:
            topic = req.get_param('topic')
            if topic:
                comments = session.query(Comment).filter(Comment.topic == topic).all()
            else:
                comments = session.query(Comment).all()
            resp.media = [{"id": comment.id, "comment": comment.comment, "topic": comment.topic, "author": comment.author, "date": comment.date.isoformat()} for comment in comments]
        except Exception as e:
            logger.error(f"Error retrieving comments: {e}")
            raise falcon.HTTPInternalServerError()
        finally:
            session.close()

    @jsonschema.validate(comment_schema)
    def on_post(self, req, resp):
        session = SessionLocal()
        try:
            comment_data = req.media
            new_comment = Comment(
                comment=comment_data['comment'],
                topic=comment_data['topic'],
                author='John Doe'  # Hardcoded for simplicity
            )
            session.add(new_comment)
            session.commit()
            resp.media = {"id": new_comment.id}
            resp.status = falcon.HTTP_201
        except Exception as e:
            logger.error(f"Error creating comment: {e}")
            raise falcon.HTTPInternalServerError()
        finally:
            session.close()

class SyncResource:
    def on_post(self, req, resp):
        session = SessionLocal()
        try:
            comments_data = req.media
            for comment_data in comments_data:
                new_comment = Comment(
                    comment=comment_data['comment'],
                    topic=comment_data['topic'],
                    author=comment_data['author'],
                    date=datetime.fromisoformat(comment_data['date'].replace("Z", "+00:00"))  # Convert ISO 8601 to datetime
                )
                session.add(new_comment)
            session.commit()
            resp.status = falcon.HTTP_200
        except Exception as e:
            logger.error(f"Error syncing comments: {e}")
            raise falcon.HTTPInternalServerError()
        finally:
            session.close()
