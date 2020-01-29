import * as yup from 'yup';

export interface ISearchForm {
  text: string;
}

export const searchFormSchema = yup.object().shape<ISearchForm>({
  text: yup.string()
});
