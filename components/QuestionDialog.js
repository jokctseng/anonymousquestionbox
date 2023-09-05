import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function QuestionDialog(props) {
    const { open, onClose, onSubmit } = props;
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (...args) => {
        if (content.replace(/\s/g, "") === "") {
            setError(true);
            return;
        }
        if (content.toLowerCase().includes("test") || content.includes("測試")) {
            setError(true);
            return;
        }
        onSubmit(content);
        setContent("");
        onClose(...args);
    };

    const handleClose = (...args) => {
        onClose(...args);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>提問</DialogTitle>
                <DialogContent>
                    <Alert severity="warning">
                        <strong>
                            除了所提問題之外的任何個資都不會被記錄
                            <br />
                            提問請勿涉及違法內容，提問不代表一定會被回答
                            <br />
                            只有被回答的問題會出現在首頁
                        </strong>
                    </Alert>
                    <TextField
                        fullWidth
                        error={error}
                        value={content}
                        onInput={(e) => {
                            setContent(e.target.value);
                        }}
                        rows={4}
                        multiline
                        margin="dense"
                        id="content"
                        label="問題內容"
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleSubmit}>發表</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
