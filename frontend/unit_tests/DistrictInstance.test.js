import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import DistrictInstance from "../src/components/InstancePages/DistrictInstance";

configure({ adapter: new Adapter() });

describe("District Instance test", function() {
  const match = {
    params: {
      id: "1"
    }
  };
  it("District Instance page doesn't have any data at first render", function() {
    const root = shallow(<DistrictInstance match={match} />);
    assert.equal(root.state("district").id, null);
  });

  it("District Instance page loads correctly from api", function(done) {
    const root = shallow(<DistrictInstance match={match} />);
    waitUntil(() => root.state("district").id != null).then(() => {
      assert.equal(root.state("district").id, 1);
      assert.equal(root.state("district").state, "Alabama");
      assert.equal(root.state("district").congressional_district, "01");
      done();
    });
  });
});
