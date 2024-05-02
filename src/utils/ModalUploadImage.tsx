import { PickerInline } from "filestack-react";

const ModalUploadImage = (props: { setURL: Function }) => {
    const { setURL } = props;
    return (
        <>
            <PickerInline
                // apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                apikey="AF7nRI60DRz2W8VeFOsx4z"
                onSuccess={(res: any) => {
                    setURL(res.filesUploaded[0].url);
                    document.getElementById('closeDialog')?.click();
                }}

                onError={(res) => alert(res)}
                pickerOptions={{
                    maxFiles: 1,
                    accept: ["image/*"],
                    errorsTimeout: 2000,
                    maxSize: 1 * 1000 * 1000,
                }}
            />
        </>
    );
};

export default ModalUploadImage;