"use strict";
/* tslint:disable:no-console */
var Sample = /** @class */ (function () {
    function Sample() {
    }
    /**
     * Sends a msdyn_SearchResourceAvailability request and logs output to the console.
     */
    Sample.prototype.sendRequest = function () {
        var _this = this;
        // enable the extended behavior that allows nested entities to be present in the SOAP payload.
        SdkExtensions.Mode.enableNestedEntities(true);
        // version is a required parameter
        var version = '1';
        // Update the Guid identifiers to match identifiers in your dev/test organization.
        // Selectively change or comment/uncomment some of the below values to see the impact on the results. 
        // Set breakpoints and reload page after each change.
        // The requirement is for a resource within the next 10 days for a duration of 8 hours. 
        // The required resource capacity is 1.
        var requirement = new Sdk.Entity('msdyn_resourcerequirement');
        var fromDate = new Date();
        var toDate = new Date();
        toDate.setDate(toDate.getDate() + 2);
        requirement.addAttribute(new Sdk.DateTime('msdyn_fromdate', fromDate));
        requirement.addAttribute(new Sdk.DateTime('msdyn_todate', toDate));
        requirement.addAttribute(new Sdk.Int('msdyn_remainingduration', 60 * 3));
        requirement.addAttribute(new Sdk.Int('msdyn_effort', 1));
        // Two resources, identified by their bookable resource Ids should not be considered for this request
        var resourceSpecification = new Sdk.Entity('organization');
        // Resources must be of one of the specified types (see bookableresource.resourcetype for option set values)
        var resourceTypes = this.buildOptionSetValueEntityCollection('resourcetypes', 'value', [
            2,
            3,
            5,
        ]);
        resourceSpecification.addAttribute(new SdkExtensions.EntityCollectionAttribute('ResourceTypes', resourceTypes));
        var restrictedResources = this.buildIdEntityCollection('bookableresource', 'value', ['5fd5f28e-275a-eb11-a812-002248163fb7']);
        resourceSpecification.addAttribute(new SdkExtensions.EntityCollectionAttribute('RestrictedResources', restrictedResources));
        // Two resources, identified by their bookable resource Ids should be the only resources considered for this request
        var preferredResources = this.buildIdEntityCollection('bookableresource', 'value', ['9cdd64b4-6759-eb11-a812-002248163fb7']);
        resourceSpecification.addAttribute(new SdkExtensions.EntityCollectionAttribute('PreferredResources', preferredResources));
        // additional constraints examples
        var constraints = new Sdk.Entity('organization');
        // Resources must have a characteristic/skill identified by the characteristic Id
        var characteristics = this.buildIdEntityCollection('bookableresourcecharacteristic', 'characteristic', ['2a993cd9-7270-eb11-a812-002248163984']);
        // Resources must have at least a '2' rating for the first characteristic
        characteristics.getEntity(0).addAttribute(new Sdk.Int('ratingValue', 2));
        constraints.addAttribute(new SdkExtensions.EntityCollectionAttribute('Characteristics', characteristics));
        // Resources must have a role/category identified by the category Id
        var roles = this.buildIdEntityCollection('bookableresourcecategory', 'bookableresourcecategoryid', ['4cd3f6f0-4e6f-eb11-a812-002248163984']);
        constraints.addAttribute(new SdkExtensions.EntityCollectionAttribute('Roles', roles));
        // Resources must be assigned to one of the territories identified by their territory Id
        var territories = this.buildIdEntityCollection('territory', 'territoryid', ['0f88b74f-7370-eb11-a812-002248163984']);
        constraints.addAttribute(new SdkExtensions.EntityCollectionAttribute('Territories', territories));
        // when value is true, only consider resources that have no assigned territory, or when used 
        // in conjunction with the 'Territories' constraint: resources are assigned to one of the specified territories or no territory at all
        constraints.addAttribute(new Sdk.Boolean('UnspecifiedTerritory', true));
        // Resources must belong to one of the specified organizational units identified by their Id
        var organizationalUnits = this.buildIdEntityCollection('msdyn_organizationalunit', 'msdyn_organizationalunitid', ['a0e80c35-4e6f-eb11-a812-002248163984']);
        constraints.addAttribute(new SdkExtensions.EntityCollectionAttribute('OrganizationalUnits', organizationalUnits));
        resourceSpecification.addAttribute(new SdkExtensions.EntityAttribute('Constraints', constraints));
        // Resources that have proposed (as opposed to committed) bookings at a given time are considered available.
        // The required effort/capacity must be considered. 
        var settings = new Sdk.Entity('organization');
        settings.addAttribute(new Sdk.Boolean('ConsiderSlotsWithProposedBookings', true));
        settings.addAttribute(new Sdk.Boolean('ConsiderSlotsWithLessThanRequiredCapacity', false));
        // create the request
        var request = new Sdk.msdyn_SearchResourceAvailabilityRequest(version, requirement, settings, resourceSpecification);
        // execute the request with success and error callback functions
        Sdk.Async.execute(request, function (response) {
            // the time slots entity collection contains all of the identified time slots
            // this includes time slots that are not eligible for the requirement, check the 'Potential' attribute for eligible slots.
            var timeSlots = response.getTimeSlots();
            // the resources entity collection contains information about the resources that have time slots.
            var resources = response.getResources();
            // the related entity contains information about resources and time slots of resources that were not directly included in the
            // original request or result, but were included as 'related', because of for example their crew membership in a crew where
            // a 'direct' resource is also a member.
            var related = response.getRelated();
            // The exceptions entity may contain an error message if an error occurred in the request. 
            // Additionally, if the request did not consider all potential resources due to the 'resource availability retrieval limit', 
            // then the number where the resources were cut off will be included.
            var exceptions = response.getExceptions();
            // The following shows different ways to parse the results. 
            // Using the Sdk entity collections and entities directly will have the most detailed information,
            // but is also very verbose and may throw errors when checking for non-existing attributes for example.
            _this.showResourcesUsingEntities(resources);
            _this.showTimeSlotsUsingEntities(timeSlots);
            // Using the view() function is less verbose, easier to navigate and makes it easier to discover result 
            // properties in the console. 
            _this.showResourcesUsingView(resources);
            _this.showTimeSlotsUsingView(timeSlots);
            // Finally, using simple objects is the least verbose way to navigate results, but also contains less information.
            // For example it does not include any information about the result property types.
            _this.showResourcesUsingSimpleObject(resources);
            _this.showTimeSlotsUsingSimpleObject(timeSlots);
        }, function (error) {
            console.log(error.message);
        });
    };
    /**
     * Creates an entity collection from an array of Ids.
     * @param entityLogicalName The entity logical name.
     * @param attributeName The attribute name.
     * @param ids an array of Ids.
     */
    Sample.prototype.buildIdEntityCollection = function (entityLogicalName, attributeName, ids) {
        var collection = new Sdk.EntityCollection();
        if (ids !== null) {
            ids.forEach(function (id) {
                var entity = new Sdk.Entity(entityLogicalName);
                entity.addAttribute(new Sdk.Guid(attributeName, id));
                collection.addEntity(entity);
            });
        }
        return collection;
    };
    /**
     * Creates an entity collection from an array of integer values.
     * @param entityLogicalName The entity logical name.
     * @param attributeName The attribute name.
     * @param ids an array of Ids.
     */
    Sample.prototype.buildOptionSetValueEntityCollection = function (entityLogicalName, attributeName, values) {
        var collection = new Sdk.EntityCollection();
        if (values !== null) {
            values.forEach(function (value) {
                var entity = new Sdk.Entity(entityLogicalName);
                entity.addAttribute(new Sdk.Int(attributeName, value));
                collection.addEntity(entity);
            });
        }
        return collection;
    };
    /**
     * Demonstrates the usage of entities and their access functions to show resource data.
     * @param resources The resources.
     */
    Sample.prototype.showResourcesUsingEntities = function (resources) {
        if (resources !== null) {
            var entities = resources.getEntities();
            entities.forEach(function (entity) {
                var resource = entity.getAttributes().getAttributeByName('Resource').getValue();
                var resourceName = resource.getAttributes().getAttributeByName('name').getValue();
                //console.log("Resource name: " + resourceName);
            });
        }
    };
    /**
     * Demonstrates the usage of the view() function to access resource data.
     * @param resources The resources.
     */
    Sample.prototype.showResourcesUsingView = function (resources) {
        if (resources !== null) {
            var view = resources.view();
            view.entities.forEach(function (entity) {
                var resourceEntity = entity.attributes.Resource.value;
                //console.log("Resource name: " + resourceEntity.attributes.name.value);
            });
        }
    };
    /**
     * Demonstrates the usage of the toSimpleObject() function to access resource data.
     * @param resources The resources.
     */
    Sample.prototype.showResourcesUsingSimpleObject = function (resources) {
        if (resources !== null) {
            var simpleObjects = resources.toSimpleObject();
            simpleObjects.forEach(function (simpleObject) {
                //console.log("Resource name: " + simpleObject.Resource.name);
            });
        }
    };
    /**
     * Demonstrates the usage of entities and their access functions to show time slot data.
     * @param timeSlots The time slots.
     */
    Sample.prototype.showTimeSlotsUsingEntities = function (timeSlots) {
        if (timeSlots !== null) {
            var entities = timeSlots.getEntities();
            entities.forEach(function (entity) {
                var attributes = entity.getAttributes();
                var startTime = attributes.getAttributeByName('StartTime').getValue();
                var endTime = attributes.getAttributeByName('EndTime').getValue();
                var type = attributes.getAttributeByName('Type').getValue().toString();
                var potential = attributes.getAttributeByName('Potential').getValue();
                var resourceName = attributes.getAttributeByName('Resource').getValue().getAttributes().getAttributeByName('Resource').getValue().getName();
                console.log("TimeSlot: Start: " + startTime + ", End: " + endTime + ", Type: " + Sample.TimeSlotType[type] + ", Potential: " + potential + ", Resource: " + resourceName);
            });
        }
    };
    /**
     * Demonstrates the usage of the view() function to access time slot data.
     * @param timeSlots The time slots.
     */
    Sample.prototype.showTimeSlotsUsingView = function (timeSlots) {
        if (timeSlots !== null) {
            var view = timeSlots.view();
            view.entities.forEach(function (entity) {
                var startTime = entity.attributes.StartTime.value;
                var endTime = entity.attributes.EndTime.value;
                var type = entity.attributes.Type.value.toString();
                var potential = entity.attributes.Potential.value;
                var resourceName = entity.attributes.Resource.value.attributes.Resource.value.Name;
                //console.log("TimeSlot: Start: " + startTime + ", End: " + endTime + ", Type: " + Sample.TimeSlotType[type] + ", Potential: " + potential + ", Resource: " + resourceName);
            });
        }
    };
    /**
     * Demonstrates the usage of the toSimpleObject() function to access time slot data.
     * @param timeSlots The time slots.
     */
    Sample.prototype.showTimeSlotsUsingSimpleObject = function (timeSlots) {
        if (timeSlots !== null) {
            var simpleObjects = timeSlots.toSimpleObject();
            simpleObjects.forEach(function (simpleObject) {
                var startTime = simpleObject.StartTime;
                var endTime = simpleObject.EndTime;
                var type = simpleObject.Type.toString();
                var potential = simpleObject.Potential;
                var resourceName = simpleObject.Resource.Resource.name;
                //console.log("TimeSlot: Start: " + startTime + ", End: " + endTime + ", Type: " + Sample.TimeSlotType[type] + ", Potential: " + potential + ", Resource: " + resourceName);
            });
        }
    };
    /**
     * Time slot type
     */
    Sample.TimeSlotType = {
        '0': 'Available',
        '1': 'Scheduled',
        '2': 'Off',
        '3': 'Break'
    };
    return Sample;
}());
// execute the request now
new Sample().sendRequest();
