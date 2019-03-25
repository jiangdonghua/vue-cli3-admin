import {post,get,patch,put} from './http';


export const login=params=>post('v2/user/login',params);
//home
export const homeBanner=params=>get('v2/banners',params);
export const foodEntries=params=>get('v2/entries',params);
export const batch_filter=params=>get('v2/batch_filter',params);
export const restaurants=params=>get('v2/restaurants',params);
//detail
export const seller=params=>get('v2/restaurant/seller',params);
export const batch_shop=params=>get('v2/restaurant/batch_shop',params);
export const batch_shop_menu=params=>get('v2/restaurant/batch_shop_menu',params);
export const batch_shop_other=params=>get('v2/restaurant/batch_shop_other',params);
export const cart_client=params=>get('v2/restaurant/cart_client',params);
