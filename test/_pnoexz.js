

// All of these snippets were written by Pnoexz and are explained in this gist:
// https://gist.github.com/Pnoexz/3886724a2441ccca68c29ab7290c90ab

module.exports = {
    bodies: [ `array1 = findEntities(ENEMY, BOT, false);
arrayLength = count(array1);
for (i = 0; i < arrayLength; i++ ) {
    enemy = array1[i];
    enemyX = getX(enemy);
    enemyY = getY(enemy);

    // Do something
}` ],
    functions: [
        `teleportIfPossible = function(ownX, ownY) {
    if (canTeleport(ownX, ownY)) {
        teleport(ownX, ownY);
    }
}`,
        `moveToIfPossible = function(ownX, ownY) {
    if (canMoveTo(ownX, ownY)) { // This will return false if ownX and ownY is not in sense range
        moveTo(ownX, ownY);
    }
}`,
        `moveTowardsCpu = function() {
    if (isAttacker) {
        destinationX = arenaWidth - 1;
        destinationY = floor(arenaHeight / 2);
        moveTo(destinationX, destinationY);
    } else {
        move();
    }
}`,
        `calculateDistance = function(sourceX, sourceY, targetX, targetY) {
    xDiff = abs(sourceX - targetX);
    yDiff = abs(sourceY - targetY);

    return xDiff + yDiff;
}`,
        `isInSenseRange = function(targetX, targetY) {
    senseRange = 5;
    if (areSensorsActivated()) {
        senseRange = 7;
    }

    return (calculateDistance(x, y, targetX, targetY) <= senseRange)
}`,
        `isEntityInZappingDistance = function(entity) {
    entityX = getX(entity);
    entityY = getY(entity);
    distance = getDistanceTo(entity);
    if (distance === 1) {
        return true;
    } else if (distance === 2 && !(entityX === x || entityY === y)) {
        return true;
    }
    return false;
}`,
        `healSelfOrAlly = function() {
    healSelf();
    healOrPersueFriendlyBot();
}

healSelf = function() {
    if (willRepair() && life < healthToStopRepairing) {
        repair();
    }
}

healOrPersueFriendlyBot = function() {
    myBotsInRange = findEntities(IS_OWNED_BY_ME, BOT, false);
    repairTarget = filterEntities(myBotsInRange, [
        SORT_BY_DISTANCE,
        SORT_BY_LIFE
    ], [
        SORT_ASCENDING,
        SORT_ASCENDING
    ]);
    if (exists(repairTarget) && getLife(repairTarget) < healthToStopRepairing) {
        if (willRepair(repairTarget)) {
            repair(repairTarget);
        } else {
            pursue(repairTarget);
        }
    }
}`
    ],
    scripts: [ `init = function() {
    lastTurnHp = life;
}

update = function () {
    tookDamage = didTakeDamage();

    if (tookDamage) {
        if (canReflect()) {
            reflect();
        }
    }
}

didTakeDamage = function() {
    tookDamage = false
    if (life < lastTurnHp) {
        tookDamage = true
    }

    lastTurnHp = life;

    return tookDamage;
}` ]
};
