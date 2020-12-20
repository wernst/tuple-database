import * as _ from "lodash"
import { QueryTuple, MIN, MAX } from "../database/compareTuple"

export const sortedValues: QueryTuple = [
	MIN,
	null,
	-Number.MAX_VALUE,
	Number.MIN_SAFE_INTEGER,
	-999999,
	-1,
	-Number.MIN_VALUE,
	0,
	Number.MIN_VALUE,
	1,
	999999,
	Number.MAX_SAFE_INTEGER,
	Number.MAX_VALUE,
	"",
	"\x00",
	"\x00\x00",
	"\x00\x01",
	"\x00\x02",
	"\x00A",
	"\x01",
	"\x01\x00",
	"\x01\x01",
	"\x01\x02",
	"\x01A",
	"\x02",
	"\x02\x00",
	"\x02\x01",
	"\x02\x02",
	"\x02A",
	"A",
	"A\x00",
	"A\x01",
	"A\x02",
	"AA",
	"AAB",
	"AB",
	"B",
	false,
	true,
	MAX,
]
