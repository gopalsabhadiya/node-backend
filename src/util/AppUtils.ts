import Logger from "./Logger";
import instance from "tsyringe/dist/typings/dependency-container";

export default class AppUtils {
    public static nullPropsRemover(obj: any): any {
        // return Object.fromEntries(
        //     Object.entries(obj)
        //         .filter(([_, v]) => v != null)
        //         .map(([k, v]) => [k, v === Object(v) ? AppUtils.nullPropsRemover(v) : v])
        // );
        if (Array.isArray(obj)) {
            return obj
                .map(v => (v && typeof v === 'object') ? obj instanceof Date ? (obj as Date).toISOString() : AppUtils.nullPropsRemover(v) : v)
                .filter(v => !(v == null));
        } else {
            if (obj instanceof Date) {
                return (obj as Date).toISOString();
            }
            let demo = Object.entries(obj)
                .map(([k, v]) => [k, v && typeof v === 'object' ? AppUtils.nullPropsRemover(v) : v]);
            return Object.entries(obj)
                .map(([k, v]) => [k, v && typeof v === 'object' ? obj instanceof Date ? (v as Date).toISOString() : AppUtils.nullPropsRemover(v) : v])
                .reduce((a:any, [k, v]) => (v == null ? a : (a[k]=v, a)), {});
        }
    }
}
