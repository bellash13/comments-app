import logging
import falcon
from app.resources import CommentResource, SyncResource
from app.models import init_db
from app.middleware import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

init_db()

app = falcon.App(middleware=[CORSMiddleware()])

comments = CommentResource()
sync = SyncResource()

app.add_route('/api/comments', comments)
app.add_route('/api/sync', sync)
