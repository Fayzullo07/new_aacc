import { PickerOverlay } from "filestack-react";

const UploadImage = (props: { setIsPicker: any, setURL: Function }) => {
    const { setIsPicker, setURL } = props;
    return (
        <>
            <PickerOverlay
                // apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                apikey="AF7nRI60DRz2W8VeFOsx4z"
                onSuccess={(res: any) => {
                    setURL(res.filesUploaded[0].url);
                    setIsPicker(false);
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

export default UploadImage;