import dotnet from 'dotenv';
import App from './app';
import PostRouter from './routes/post.route';
import AuthenticationRouter from './routes/auth.route';

dotnet.config();

const port = process.env.PORT || 3000;
const app = new App({
	routes: [new PostRouter(), new AuthenticationRouter()],
	port: port,
});

app.listen();
