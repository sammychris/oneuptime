import React, { ReactElement } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import Button from '../Basic/Button/Button';
import FormValues from './Types/FormValues';
import RequiredFormFields from './Types/RequiredFormFields';
import Fields from './Types/Fields';
import DataField from './Types/Field';
import ButtonTypes from '../Basic/Button/ButtonTypes';
import BadDataException from 'Common/Types/Exception/BadDataException';
import { JSONObject } from 'Common/Types/JSON';
import FormFieldSchemaType from './Types/FormFieldSchemaType';
import Email from 'Common/Types/Email';

export interface ComponentProps<T extends Object> {
    id: string;
    initialValues: FormValues<T>;
    onSubmit: (values: FormValues<T>) => void;
    onValidate?: (values: FormValues<T>) => FormikErrors<FormValues<T>>;
    requiredfields: RequiredFormFields<T>;
    fields: Fields<T>;
    model: T;
    submitButtonText?: string;
    title?: string;
    description?: string;
    showAsColumns?: number;
    footer: ReactElement;
}

function getFieldType(fieldType: FormFieldSchemaType): string {
    switch (fieldType) {
        case FormFieldSchemaType.Email:
            return 'email';
        case FormFieldSchemaType.Password:
            return 'password';
        default:
            return 'text';
    }
}

const BasicForm = <T extends Object>(
    props: ComponentProps<T>
): ReactElement => {
    const getFormField = (field: DataField<T>, index: number): ReactElement => {
        let fieldType: string = field.fieldType
            ? getFieldType(field.fieldType)
            : 'text';

        if (Object.keys(field.field).length === 0) {
            throw new BadDataException('Object cannot be without Field');
        }
        return (
            <div key={index}>
                <label>
                    <span>{field.title}</span>
                    {
                        <span>
                            <a
                                href={field.sideLink?.url.toString()}
                                target={`${
                                    field.sideLink?.openLinkInNewTab
                                        ? '_blank'
                                        : '_self'
                                }`}
                            >
                                {field.sideLink?.text}
                            </a>
                        </span>
                    }
                </label>
                <p>{field.description}</p>
                <Field
                    autoFocus={index === 0 ? true : false}
                    placeholder={field.placeholder}
                    type={fieldType}
                    name={
                        field.overideFieldKey
                            ? field.overideFieldKey
                            : (Object.keys(field.field)[0] as string)
                    }
                />
                <ErrorMessage
                    name={
                        field.overideFieldKey
                            ? field.overideFieldKey
                            : (Object.keys(field.field)[0] as string)
                    }
                    component="div"
                />
            </div>
        );
    };

    const validateLength = (
        content: string,
        field: DataField<T>
    ): string | null => {
        if (field.validation) {
            if (field.validation.minLength) {
                if (content.trim().length < field.validation?.minLength) {
                    return `${field.title || name} cannot be less than ${
                        field.validation.minLength
                    } characters.`;
                }
            }

            if (field.validation.maxLength) {
                if (content.trim().length > field.validation?.maxLength) {
                    return `${field.title || name} cannot be more than ${
                        field.validation.maxLength
                    } characters.`;
                }
            }
        }
        return null;
    };

    const validateRequired = (content: string, field: DataField<T>) => {
        if (field.required && content.length === 0) {
            return `${field.title} is required.`;
        }
        return null;
    };

    const validateData = (content: string, field: DataField<T>) => {
        if (field.fieldType === FormFieldSchemaType.Email) {
            if (!Email.isValid(content!)) {
                return 'Email is not valid.';
            }
        }
        return null;
    };

    const validate = (values: FormValues<T>): object => {
        const errors: JSONObject = {};
        const entries: JSONObject = { ...values } as JSONObject;

        for (const field of props.fields) {
            const name = field.overideFieldKey
                ? field.overideFieldKey
                : (Object.keys(field.field)[0] as string);
            if (name in values) {
                const content = entries[name]?.toString();

                if (content) {
                    // Check Required fields.
                    const resultRequired = validateRequired(content, field);
                    if (resultRequired) {
                        errors[name] = resultRequired;
                    }

                    // Check for valid email data.
                    const resultValidateData = validateData(content, field);
                    if (resultValidateData) {
                        errors[name] = resultValidateData;
                    }
                    // check for length of content
                    const result = validateLength(content, field);
                    if (result) {
                        errors[name] = result;
                    }
                    
                }
            } else if (field.required) {
                errors[name] = `${field.title || name} is required.`;
            }
        }
        return errors;
    };

    return (
        <div>
            <Formik
                initialValues={props.initialValues}
                validate={(values: FormValues<T>) => {
                    if (props.onValidate) {
                        return props.onValidate(values);
                    }
                    return validate(values);
                }}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={(values: FormValues<T>, { setSubmitting }) => {
                    props.onSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, isValid }) => {
                    return (
                        <Form
                            autoComplete="off"
                            className={`grid_form_${props.showAsColumns}`}
                        >
                            <h1>{props.title}</h1>

                            <p className="description">{props.description}</p>

                            <div className={`grid_${props.showAsColumns}`}>
                                {props.fields &&
                                    props.fields.map(
                                        (field: DataField<T>, i) => {
                                            return getFormField(field, i);
                                        }
                                    )}
                            </div>

                            <Button
                                title={props.submitButtonText || 'Submit'}
                                disabled={isSubmitting || !isValid}
                                type={ButtonTypes.Submit}
                                id={`${props.id}-submit-button`}
                            />
                            {props.footer}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default BasicForm;
