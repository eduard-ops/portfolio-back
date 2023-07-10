import DatauriParser from 'datauri/parser'

import { DataURI } from 'datauri/types'

const parser = new DatauriParser()

export const bufferToDataURI = (fileFormat: string, buffer: DataURI.Input) =>
    parser.format(fileFormat, buffer)
