import { checkToken } from "../../../utils";
import { DBQuery } from "../../../utils/db";

export default async function handler(req, res) {
    const { id } = req.query;
    const { token } = req.headers;
    if (!checkToken(token)) {
        res.status(401).json({
            msg: "請先登入",
        });
        return;
    }
    const query = new DBQuery("Question");
    query.equalTo("objectId", id);
    const question = await query.first();
    await question.destroy();
    res.status(200).json({
        msg: "刪除成功",
    });
}
