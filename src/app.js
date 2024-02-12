import { router } from './router.js';
import express from 'express';

export const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(router);
app.set('view engine', 'ejs');

