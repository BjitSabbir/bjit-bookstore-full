import { useEffect, useState } from "react";
import "./discountForm.scss";
import { useForm, Controller, set } from "react-hook-form";
import { toast } from "react-toastify";

export default function DiscountForm({ discount, onUpdate, onCancel }) {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = useForm();
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (discount) {
            setValue("name", discount.name);
            setValue("description", discount.description);
            setValue("image", discount.image);
            setImagePreview(discount.image);
            setValue("discountValue", discount.discountValue);
            setValue("bookIds", discount.bookIds);
            setValue("bookGenres", discount.bookGenres);
            setValue("bookAuthors", discount.bookAuthors);
            setValue("activationDate", discount.activationDate);
            setValue("endDate", discount.endDate);
        }
    }, [discount, setValue]);

    const onSubmit = (data) => {
        if (discount._id) data._id = discount._id;
        if (typeof data.bookAuthors === "string") {
            data.bookAuthors = data.bookAuthors.split(",");
        }
        if (typeof data.bookGenres === "string") {
            data.bookGenres = data.bookGenres.split(",");
        }
        if (typeof data.bookIds === "string") {
            data.bookIds = data.bookIds.split(",");
        }

        // Conditionally convert discountValue to an integer
        if (typeof data.discountValue === "string") {
            data.discountValue = parseInt(data.discountValue, 10);
        }

        onUpdate(data);
    };

    const handleImageChange = (e) => {
        const imageUrl = e.target.value;
        setImagePreview(imageUrl);
    };

    return (
        <div className="discountFormContainer">
            <div className="update-popup">
                <i className="fas fa-times close-btn" onClick={onCancel}></i>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="formContainer"
                >
                    <label>Name</label>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={discount.name}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} />
                                {errors.name && (
                                    <span>{errors.name.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <label>Description</label>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue={discount.description}
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} />
                                {errors.description && (
                                    <span>{errors.description.message}</span>
                                )}
                            </div>
                        )}
                    />
                    <label>Image</label>
                    <Controller
                        name="image"
                        control={control}
                        defaultValue={discount.image}
                        rules={{
                            pattern: {
                                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
                                message: "Invalid image format",
                            },
                        }}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} onBlur={handleImageChange} />
                                {errors.image && (
                                    <span>{errors.image.message}</span>
                                )}
                            </div>
                        )}
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Image Preview" />
                        </div>
                    )}

                    <label>Discount Value</label>
                    <Controller
                        name="discountValue"
                        control={control}
                        defaultValue={discount.discountValue}
                        rules={{
                            required: "Discount Value is required",
                            min: {
                                value: 5,
                                message:
                                    "Discount Value must be between 5 and 80",
                            },
                            max: {
                                value: 80,
                                message:
                                    "Discount Value must be between 5 and 80",
                            },
                        }}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input type="number" {...field} />
                                {errors.discountValue && (
                                    <span>{errors.discountValue.message}</span>
                                )}
                            </div>
                        )}
                    />
                    <label>Book IDs</label>
                    <Controller
                        name="bookIds"
                        control={control}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} />
                                {errors.bookIds && (
                                    <span>{errors.bookIds.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <label>Book Genres</label>
                    <Controller
                        name="bookGenres"
                        control={control}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} />
                                {errors.bookGenres && (
                                    <span>{errors.bookGenres.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <label>Book Authors</label>
                    <Controller
                        name="bookAuthors"
                        control={control}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input {...field} />
                                {errors.bookAuthors && (
                                    <span>{errors.bookAuthors.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="activationDate"
                        control={control}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input
                                    type="datetime-local"
                                    {...field}
                                    value={field.value || ""}
                                />
                                {errors.activationDate && (
                                    <span>{errors.activationDate.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <label>End Date</label>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <div className="input-holder">
                                <input
                                    type="datetime-local"
                                    {...field}
                                    value={field.value || ""}
                                />
                                {errors.endDate && (
                                    <span>{errors.endDate.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <div className="btn-container">
                        <button type="submit">Submit</button>
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
