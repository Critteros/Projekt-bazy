/**
 * Used only for intellisense where prepared templates are not possible for use
 * @param strings
 * @param values
 */
export const sqlUnsafe = (strings: TemplateStringsArray, ...values: unknown[]) => {
  let statement = strings[0] as string;

  for (let i = 0; i < values.length; i++) {
    const token = values[i];
    switch (typeof token) {
      case 'number': {
        statement += `${token}`;
        break;
      }
      case 'object': {
        if (token === null) {
          statement += `NULL`;
          break;
        }
        if (token instanceof Date) {
          statement += `to_timestamp(${parseInt((token.getTime() / 1000).toFixed(0))})::date`;
          break;
        }
        statement += `'${token.toString()}'`;
        break;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        statement += `'${token}'`;
        break;
      }
    }
    const nextFragment = strings[i + 1];
    if (nextFragment) {
      statement += nextFragment;
    }
  }

  return statement;
};
