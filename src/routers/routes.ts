import { Router } from 'express';
import { AuthGuard } from '../guards/Auth.guard';
import { hashKey } from '../guards/HashKey';
import {  collection, createCollection, deleteCollection, index } from '../services/collections.service';
import { deleteKey, generatorKeys, getKeys, updateKey } from '../services/keys.service';


export const router = Router();

router.get('/collections',index)
router.post('/collections', AuthGuard, createCollection, hashKey, generatorKeys);
router.get('/collections/:collection', AuthGuard, collection);
router.delete('/collections/:_id', deleteCollection);

router.post('/savanapoint-hok/generate-key', AuthGuard, hashKey, generatorKeys)


router.get('/savanapoint-hok/:flag', AuthGuard, getKeys)

router.put('/savanapoint-hok/update-key/:_id', AuthGuard, hashKey, updateKey)

router.delete('/savanapoint-hok/delete-key/:_id', AuthGuard, hashKey, deleteKey)
