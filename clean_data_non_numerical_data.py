def handle_non_numerical_data(df):
    columns = df.columns.values

    for column in columns:
        text_digt_vals = {}
        def convert_to_int(val):
            return text_digt_vals[val]
        
        if df[column].dtype != np.int64 and df[column].dtype != np.float64:
            column_contents = df[column].values.tolist()
            unique_elemnts = set(column_contents)
            x = 0
            for unique in unique_elemnts:
                if unique not in text_digt_vals:
                    text_digt_vals[unique] = x
                    x+=1
            df[column] = list(map(convert_to_int,df[column]))
    return df
