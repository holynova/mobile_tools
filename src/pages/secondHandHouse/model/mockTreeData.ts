export const mockTreeData2 = {
  id: "A0",
  value: {
    title: "订单金额",
    items: [
      {
        text: "3031万",
      },
    ],
  },
  children: [
    {
      id: "A1",
      value: {
        title: "华南",
        items: [
          {
            text: "1152万",
          },
          {
            text: "占比",
            value: "30%",
          },
        ],
      },
      children: [
        {
          id: "A11",
          value: {
            title: "广东",
            items: [
              {
                text: "1152万",
              },
              {
                text: "占比",
                value: "30%",
              },
            ],
          },
        },
        {
          id: "A12",
          value: {
            title: "广西",
            items: [
              {
                text: "1152万",
              },
              {
                text: "占比",
                value: "30%",
              },
            ],
          },
        },
        {
          id: "A13",
          value: {
            title: "海南",
            items: [
              {
                text: "1152万",
              },
              {
                text: "占比",
                value: "30%",
              },
            ],
          },
        },
      ],
    },
    {
      id: "A2",
      value: {
        title: "华北",
        items: [
          {
            text: "595万",
          },
          {
            text: "占比",
            value: "30%",
            icon: "https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png",
          },
        ],
      },
    },
  ],
};
export const mockTreeData = {
  id: "Modeling Methods",
  children: [
    {
      id: "Classification",
      children: [
        { id: "Logistic regression" },
        { id: "Linear discriminant analysis" },
        { id: "Rules" },
        { id: "Decision trees" },
        { id: "Naive Bayes" },
        { id: "K nearest neighbor" },
        { id: "Probabilistic neural network" },
        { id: "Support vector machine" },
      ],
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            { id: "Different initializations" },
            { id: "Different parameter choices" },
            { id: "Different architectures" },
            { id: "Different modeling methods" },
            { id: "Different training sets" },
            { id: "Different feature sets" },
          ],
        },
        {
          id: "Methods",
          children: [
            { id: "Classifier selection" },
            { id: "Classifier fusion" },
          ],
        },
        {
          id: "Common",
          children: [{ id: "Bagging" }, { id: "Boosting" }, { id: "AdaBoost" }],
        },
      ],
    },
    {
      id: "Regression",
      children: [
        { id: "Multiple linear regression" },
        { id: "Partial least squares" },
        { id: "Multi-layer feedforward neural network" },
        { id: "General regression neural network" },
        { id: "Support vector regression" },
      ],
    },
  ],
};
