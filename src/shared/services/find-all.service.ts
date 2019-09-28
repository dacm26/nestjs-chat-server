import { Injectable } from '@nestjs/common';
import { get, has, isArray, isEmpty, isPlainObject, isString, reduce, set } from 'lodash';
import { Query, Types } from 'mongoose';

import { FindAllOptionsDto } from '../dtos';

@Injectable()
export class FindAllService {

  constructor() {
  }

  // Sanitizes the provided options for the getFindAllQuery method.
  public parseFindAllOptions(options) {
    const parsedOptions = { ...options };
    // parse the options.page to number
    if (isString(options.page)) {
      parsedOptions.page = Number(options.page);
    } else {
      parsedOptions.page = 1;
    }

    // parse the options.pageSize to number
    if (isString(options.pageSize)) {
      parsedOptions.pageSize = Number(options.pageSize);
    }
    // parse the select to array
    if (isString(options.select)) {
      try {
        parsedOptions.select = JSON.parse(options.select);
      } catch (e) {
        parsedOptions.select = [];
      }
    }
    // parse the where to json
    if (isString(options.where)) {
      try {
        parsedOptions.where = JSON.parse(options.where);
      } catch (e) {
        parsedOptions.where = {};
      }
    }
    // parse the sort to array
    if (isString(options.sort)) {
      try {
        parsedOptions.sort = JSON.parse(options.sort);
      } catch (e) {
        parsedOptions.sort = [];
      }
    }
    return parsedOptions;
  }

  // Parses the provided options to mongoose find method.
  public getFindAllQuery(options: FindAllOptionsDto) {
    let query = new Query();
    // select which columns do we want to show (by default shows all the columns)
    if (isArray(options.select) && !isEmpty(options.select)) {
      query.select(options.select);
    }
    // order by the specified columns
    query = this.getOrderByQuery(options, query);
    // parses the where options (if it has the $regex property, it creates a new RegExp object)
    query = this.getWhereQuery(options, query);
    return query;
  }

  private getOrderByQuery(options: any, query: any) {
    if (isArray(options.sort) && !isEmpty(options.sort)) {
      options.sort = reduce(options.sort, (sortArray: Array<[string, number]>, element: string) => {
        if (element.startsWith('-')) {
          sortArray.push([element.substring(1), -1]);
        } else {
          sortArray.push([element, 1]);
        }
        return sortArray;
      }, []);
      query.sort(options.sort);
    }
    return query;
  }

  private getWhereQuery(options: any, query: any) {
    if (!isEmpty(options.where)) {
      options.where = reduce(options.where, (whereOptions, value: any, key: string) => {
        if (!isEmpty(value) && isPlainObject(value) && has(value, '$regex')) {
          whereOptions[key] = value;
          whereOptions[key].$regex = new RegExp(value.$regex);
        } else if (!isEmpty(value) && isPlainObject(value) && has(value, '$objectId')) {
          whereOptions[key] = Types.ObjectId(value.$objectId);
        } else if (!isEmpty(value) && isPlainObject(value) && has(value, '$date')) {
          whereOptions[key] = new Date(value.$date);
        } else if (!isEmpty(value) && isPlainObject(value) && value.parseDateByPath && isString(value.path)) {
          set(whereOptions, [key, value.path], new Date(get(value, value.path)));
        } else {
          whereOptions[key] = value;
        }
        return whereOptions;
      }, {});
      query.where(options.where);
    }
    return query;
  }
}
