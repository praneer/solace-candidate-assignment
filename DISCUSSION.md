## Additional time spent on:

- Adding pagination

## Possible extra improvements:

- Change DB calls to be paginated instead of using `slice` method on the list
- Separate db calls to service layer
- Add model validation using zod or similar
- Add unit tests
- Make table header static and only the data scrollable
- Using fixed height for table so that pagination buttons are always visible without having to scroll to the bottom of the table
- Add filter to table header
- There is a known bug in UI that if you are not on the first page view and do a search with results having only one page, then the view stays on that page number with no data. Navigating to the first page will display the search result. 