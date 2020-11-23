---
slug: /faq
title: FAQ
---

## What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

To change the path to the `terraform` binary, set the `TERRAFORM_BINARY` env variable:
```sh
TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir /path/to/code
```

## Does Infracost need cloud credentials?

Infracost itself does not need any cloud credentials. Infracost runs Terraform internally and depending on which Infracost [usage method](/docs/#usage-methods) is used, Terraform might need access to cloud credentials, e.g. when running `terraform init` and `terraform plan`. These commands are only used to produce [plan JSON files](https://www.terraform.io/docs/commands/show.html#json-output) and no changes are made to your Terraform state or cloud resources.

## How does Infracost get cloud prices?

Infracost gets prices from the [Cloud Pricing API](https://github.com/infracost/cloud-pricing-api). We offer a free hosted Cloud Pricing API and continually update it with the latest cloud vendor prices.

## What data is sent to the hosted Cloud Pricing API?

The Cloud Pricing API needs the relevant data to return a unique cloud price point. The count of Terraform resource types is also sent to the pricing API to enable us to better prioritize adding new resources. No cloud credentials, secrets, tags or Terraform resource identifiers are sent to the pricing API.

Here is an example request to the pricing API for a t3.micro instance and the returned response:

Request:
```graphql
query {
  products(
    filter: {
      vendorName: "aws",
      service: "AmazonEC2",
      productFamily: "Compute Instance",
      region: "us-east-1",
      attributeFilters: [
        { key: "instanceType", value: "t3.micro" },
        { key: "tenancy", value: "Shared" },
        { key: "capacitystatus", value: "Used" },
        { key: "operatingSystem", value: "Linux" },
        { key: "preInstalledSw", value: "NA" }
      ]
    },
  ) {
    prices(
      filter: {
        purchaseOption: "on_demand"
      }
    ) { priceHash, USD }
  }
}

```

Response:
```json
{
  "data": {
    "products": [
      {
        "prices": [
          {
            "priceHash": "2f1bc092c9e34dc084a4d96d19ef47ca-d2c98780d7b6e36641b521f1f8145c6f",
            "USD": "0.0104000000"
          }
        ]
      }
    ]
  }
}
```

## Can I run my own Cloud Pricing API?

Yes! The [Cloud Pricing API repo](https://github.com/infracost/cloud-pricing-api) has instructions on how it can be run. Set the `INFRACOST_PRICING_API_ENDPOINT` environment variable to point `infracost` to it.