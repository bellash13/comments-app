import falcon

class CORSMiddleware:
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        if req.method == 'OPTIONS':
            resp.status = falcon.HTTP_200
