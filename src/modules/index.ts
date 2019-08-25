
import { Axios } from 'axios';

import * as Constants from '../utils/constants';

export const api = Axios.create({
    baseURL: 'test',
    timeout: 5000,
    headers: {},
    params: {}
});