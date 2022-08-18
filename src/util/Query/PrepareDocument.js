import { CATEGORY_QUERY, PRODUCT_QUERY } from '../Request/Query.config';

const setFieldParams = (name, type) => {
  if (type === CATEGORY_QUERY && name === 'category') {
    return `${name}(input: $input)`;
  }

  if (type === PRODUCT_QUERY && name === 'product') {
    return `${name}(id: $id)`;
  }

  return name;
}

const insertCurlyBrackets = (str) => {
  return '{\n' + str + '\n}';
}

const resolveChildren = (children) => {
  return children.length ? handleBody(children) : '';
}

const handleBody = (arrayOfFields, type) => {
  
  const body = arrayOfFields.map((field) => {
    const { name } = field;
    const fieldName = setFieldParams(name, type);
    return fieldName + resolveChildren(field.children);
  });

  return insertCurlyBrackets(body.join('\n'));
}

const setQueryParams = (type) => {
  switch(type) {
    case CATEGORY_QUERY:
      return 'query getCategory($input: CategoryInput)';

    case PRODUCT_QUERY:
      return 'query getProduct($id: String!)';
      
    default:
      return 'query';
  }
}

export const prepareQuery = (fieldList, { type }) => {
  const queryParams = setQueryParams(type);

  return {
    query: queryParams + handleBody(fieldList, type),
  }
}
