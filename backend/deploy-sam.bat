sam package --template-file template.yaml --output-template-file package.yaml --s3-bucket s3bucketevergreen --profile eg-fin

sam deploy --template-file template.yaml --stack-name arq-avzd-fin-be --capabilities CAPABILITY_IAM --s3-bucket s3bucketevergreen --profile eg-fin