Drawing multiple triangles instead of a single square - this means
we're binding more data (9 vertices, making 3 triangles) and increasing
the range of data we read in `.drawArrays`
