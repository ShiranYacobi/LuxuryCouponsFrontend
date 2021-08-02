import { Category } from './CategoryModel';
class Coupon {
        companyId: string;
        amount: number;
        price: number;
        category: Category;
        title: string;
        description: string;
        image: FileList;
        startDate: Date = new Date();
        endDate: Date = new Date();
        couponId?: string ;
}

export default Coupon;

